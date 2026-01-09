import React from "react";

function MantraCard() {
  return (
    <div className="glassCard w-full px-4 py-4 text-white bg-blue-500 sm:w-[500px]">
      <div>
        <p className="font-semibold tracking-wide">
          कृष्णाय वासुदेवाय हरये परमात्मने ।
        </p>
        <p className="font-semibold tracking-wide">
          प्रणतः क्लेशनाशाय गोविंदाय नमो नमः ।।
        </p>
      </div>
    </div>
  );
}

export default React.memo(MantraCard);
