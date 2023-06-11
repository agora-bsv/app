// pages/wallet.js
import React from "react";

const WalletPage = ({ handle, balance, permissions }) => {
  return (
    <div>
      <h1>Welcome, {handle}!</h1>
      <p>Balance: {balance}</p>
      <p>Permissions: {permissions.join(", ")}</p>
      {/* Add your wallet UI components here */}
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { sessionToken } = query;

  try {
    // Fetch user data based on the sessionToken
    const userData = await fetchUserData(sessionToken); // Implement your own function to fetch user data

    return {
      props: {
        handle: userData.handle,
        balance: userData.balance,
        permissions: userData.permissions,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);

    // Redirect to an error page or handle the error as needed
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}

export default WalletPage;
