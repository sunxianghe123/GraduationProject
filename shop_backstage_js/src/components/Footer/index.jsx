import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} 毕设商城-孙祥赫`}
      links={null}
    />
  );
};

export default Footer;
