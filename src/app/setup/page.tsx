import { SetupForm } from "./setup"

export const metadata = {
  title: 'セットアップ',
  description: '',
}

export default function Dashboard() {
  return (
    <main className='p-12 flex justify-center'>
      <SetupForm />
    </main>
  )
}