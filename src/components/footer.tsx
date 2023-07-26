export const Footer = () => {
  return (
    <footer className="absolute w-full h-60 bottom-0 p-12 border-t grid grid-cols-5">
      <div className="col-span-2 space-y-4">
        <span className="text-2xl font-semibold text-foreground">AIBoX</span>
        <p className="text-muted-foreground">AIBoXはAIクリエイターのために作られた支援サービスです</p>
      </div>
      <div />
      <div className="space-y-4 text-sm">
        <span className="text-xl font-semibold text-foreground">サポート</span>
        <p>お問い合わせ</p>
      </div>
      <div className="space-y-4 text-sm">
        <span className="text-xl font-semibold text-foreground">その他</span>
        <p>利用規約</p>
        <p>プライバシーポリシー</p>
        <p>特定商取引法に基づく表記</p>
      </div>
    </footer>
  )
}