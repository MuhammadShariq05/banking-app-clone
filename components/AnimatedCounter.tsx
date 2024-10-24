"use client";

import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <>
      <div className="w-full">
        <CountUp
          start={amount - 100}
          end={amount}
          duration={3.75}
          prefix="₹ "
          decimals={2}
          decimal="."
        />
      </div>
    </>
  );
};

export default AnimatedCounter;
