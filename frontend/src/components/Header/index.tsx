import Logo from "../../assets/logo-original.webp";

export default function Header() {
  return (
    <>
      <header className="bg-header p-4 flex justify-center items-center">
        <div className="max-w-[1200px] flex justify-between items-center w-full">
          <div className="flex items-center">
            <img src={Logo} alt="Logo Shopper" className="h-12" />
          </div>
          <span className="text-green_shooper font-bold text-2xl">
            Teste Shopper
          </span>
        </div>
      </header>
    </>
  );
}
