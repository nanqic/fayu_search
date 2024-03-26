export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center gap-2 p-4 bg-neutral text-neutral-content">
            <nav className="space-x-4">
                <a target='_blank' href="https://dev.hdcx.pages.dev">慧灯禅修 dev</a>
                <a target='_blank' href="https://cxbbj.huidengchanxiu.net">禅修班笔记 dev</a>
                <a target='_blank' href="https://www.fahaisouxun.com/search">法海搜寻</a>
                <a target='_blank' href="https://a.hdcxb.net/login2">有声书</a>
            </nav>
            <aside>
                <p><a target='_blank' href="https://www.huidengvan.com/">慧灯小组温哥华</a>  ❤️ 发心制作 {new Date().getFullYear()}</p>
            </aside>
        </footer>
    )
}
