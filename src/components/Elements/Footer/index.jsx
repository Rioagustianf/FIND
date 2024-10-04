import { Footer } from "flowbite-react";

const FooterComponent = () => {
  return (
    <Footer container className="bg-[#002337] mt-24">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <img src="../../../../public/FIND.png" alt="Logo" width={300} />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="FIND™" year={2022} />
      </div>
    </Footer>
  );
};

export default FooterComponent;
