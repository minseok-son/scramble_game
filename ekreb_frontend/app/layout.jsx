import "@styles/globals.css";

const RootLayout = ({ children }) => {
  return (
    <html className="h-full" lang="en">
      <body className="flex w-full h-full">
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
