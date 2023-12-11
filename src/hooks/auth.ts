import { useRouter } from "next/navigation";
import { database } from "@/hooks/database";
import { supabase } from "@/hooks/supabase";
const {
	insertUser,
	insertProfile,
	updateDob,
	getActivated,
	getUserProfile,
	setActivated,
} = database();

export const useAuth = () => {
	const router = useRouter();
	const signInWithGoogle = async () => {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					queryParams: {
						access_type: "offline",
						prompt: "consent",
					},
				},
			});
			// Googlの場合のinsertUseも考える
			// ユーザーが存在するかを確認して、いなかったら表示名設定とかのページに行きたい Ftps
			await router.push("/");
			// console.log({ data, error})
		} catch (error) {
			console.error(error);
		}
	};

	const createUser = async (email: string, password: string): Promise<void> => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: password,
			});
			if (!error) {
				await insertUser(email, password, data);
			}
			// console.log({ data, error });
		} catch (error) {
			console.error(error);
		}
	};

	const getActivationStatus = async (userdata: { [key: string]: any }) => {
		try {
			return await getActivated(userdata.user.id);
		} catch (error) {
			console.error(error);
		}
	};

	const logoutUser = async () => {
		const { error } = await supabase.auth.signOut();
		document.cookie = "access_token=;";
		await router.push("/");
	};

	const createProfile = async (
		uid: string,
		account_id: string,
		display_name: string,
		dob: string,
		cf_url: string,
	) => {
		try {
			const description = "Hello!";
			const created_at = new Date().toISOString();
			const updated_at = new Date().toISOString();
			await insertProfile(
				uid,
				account_id,
				display_name,
				description,
				created_at,
				updated_at,
				cf_url,
			);
			await updateDob(uid, dob);
			await setActivated(uid);
		} catch (error) {
			console.error(error);
		}
	};

	const loginWithPassword = async (email: string, password: string) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});
			const is_activated = await getActivationStatus(data);
			if (!error) {
				if (!is_activated) {
					console.log(data.session?.user.id);
					console.log(data.session?.user.id.length);
					await router.push(
						`/setup?id=${encodeURIComponent(
							String(data.session?.user.id),
						)}&email=${encodeURIComponent(String(data.session?.user.email))}`,
					);
				} else {
					await router.push(
						`/?id=${encodeURIComponent(String(data.session?.access_token))}`,
					);
				}
			} else {
				return error;
			}
		} catch (error) {
			console.error(error);
			return error;
		}
		return null;
	};

	const resendVerificationEmail = async (email: string) => {
		try {
			const { data, error } = await supabase.auth.resend({
				type: "signup",
				email: email,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const getSession = async () => {
		return await supabase.auth.getSession();
	};

	const confirmSession = async (user_id: string): Promise<boolean> => {
		const { data } = await getSession();
		console.log(data);
		return data.session !== null && user_id === data.session?.user.id;
	};

	const getSessionUser = async (
		sessionData: object,
		setSessionData: Function,
	) => {
		const { data } = await getSession();
		if (data.session !== null) {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;
			const userdata = await getUserProfile(user.id);
			if (!userdata) return;
			await setSessionData({
				...sessionData,
				logged: true,
				displayname: userdata[0]?.display_name ?? null,
				icon_url: userdata[0]?.icon_url ?? null,
				account_id: userdata[0]?.account_id ?? null,
				email: user.email ?? null,
			});
		}
	};

	return {
		signInWithGoogle,
		createUser,
		loginWithPassword,
		resendVerificationEmail,
		createProfile,
		getActivationStatus,
		logoutUser,
		confirmSession,
		getSessionUser,
	};
};
