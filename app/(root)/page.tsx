import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    // The header section is repeated in every page so
    // making a comman component for it
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and Manage your account and transactions efficiently."
          />

          {/* Total balance showing box */}
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.5}
          />
        </header>
        RECENT TRANSACTION
      </div>
      <RightSideBar user={loggedIn} transaction={[]} banks={[{currentBalance: 1250.5}, {currentBalance: 500.75}]}/>
    </section>
  );
};

export default Home;
