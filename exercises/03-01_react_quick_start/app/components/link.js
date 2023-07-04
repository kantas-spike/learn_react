import Link from "next/link"

export default function MyLink({ children, className, ...others}) {
    return <Link className={"underline underline-offset-4 text-blue-400 " + className} {...others}>{children}</Link>
}
