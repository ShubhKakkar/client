export const metadata = {
  title: "grocery-store/admin",
  description: "Admin for grocery store app",
};

const layout = ({children}) => {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
}

export default layout;