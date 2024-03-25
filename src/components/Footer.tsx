export default function Footer() {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">

            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a target='_blank' href="https://dev.hdcx.pages.dev">慧灯禅修 dev</a>
                <a target='_blank' href="https://cxbbj.huidengchanxiu.net">禅修班笔记 dev</a>
                <a target='_blank' href="https://www.fahaisouxun.com/search">法海搜寻</a>
                <a target='_blank' href="https://a.hdcxb.net/login2">有声书</a>
            </nav>
            <aside className="items-center grid-flow-col">
                <p>慧灯小组温哥华 ❤️ 发心制作 {new Date().getFullYear()}</p>
            </aside>
        </footer>
    )
}
