import { Navbar, Input, Button } from "@nextui-org/react";
import useMediaQuery from "../../hooks/mediaquery";
import { SearchIcon } from "./SearchIcon";
import { XIcon } from "./XIcon";

type Props = {
    onClick: () => void;
    isOpen: Boolean;
};

const SearchInput: React.FC<Props> = ({ onClick, isOpen }) => {
    const isxs = useMediaQuery('(min-width: 960px)')

    return (
        <Navbar.Item
        >
            {isxs || isOpen ?
            <>
                <Input
                    clearable
                    contentLeft={
                        <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
                    }
                    contentLeftStyling={false}
                    css={{
                        w: "100%",
                        "@xsMax": {
                            mw: "300px",
                        },
                        "& .nextui-input-content--left": {
                            h: "100%",
                            ml: "$4",
                            dflex: "center",
                        },
                    }}
                    placeholder="検索"
                />
                {!isxs &&
                <button style={{
                    cursor: "pointer",
                    padding: 0,
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                    border: "none",
                    outline: "none",
                    font: "inherit",
                    color: "inherit",
                    background: "none"
                }} onClick={onClick}>
                    <XIcon fill="var(--nextui-colors-accents6)" size={16} />
                </button>
                }
            </>
            :
            <button style={{
                cursor: "pointer",
                padding: 0,
                border: "none",
                outline: "none",
                font: "inherit",
                color: "inherit",
                background: "none"
            }} onClick={onClick}>
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
            </button>
            }
        </Navbar.Item>
    )
} 

export default SearchInput