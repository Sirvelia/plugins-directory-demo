import Link from "next/link"
import { WordPressLogo } from "../WordPressLogo"

export const Header = () => {
    return (
        <header className="bg-[#23282d] px-[20px] md:px-[80px] py-[20px] sticky top-0 z-10">
            <div className="max-w-[1160px] mx-auto flex items-center justify-between text-white gap-4">

                <div className="flex items-center gap-4">
                    <Link href="/">
                        <WordPressLogo />
                    </Link>
                    <Link className="hover:underline" href="/">
                        <span className="text-[14px]">Plugin Directory</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

