// pages/crowdfunding.js
import React, { useEffect, useState } from 'react';
import Viewport from '../components/Viewport';
import PageLayout from '../components/PageLayout';
import FundingItem from '../components/FundingItem';

export default function CrowdFunding() {
  const title = 'Crowd Funding';
  const description = 'This is the Crowdfunding page';
  const headerObjects = [
    { icon: String.fromCodePoint(0xf4c0) },
    { icon: String.fromCodePoint(0xf4c0), onClick: () => console.log('Perform action') },
  ];

  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/crowdfunding-features');
        const data = await response.json();

        setFeatures(data);
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Viewport>
      <PageLayout title={title} description={description} headerObjects={headerObjects}>
        <div className="funding-items-container">
          {features.map((feature, index) => (
            <FundingItem 
              key={index}
              title={feature.title} 
              description={feature.description} 
              collectedAmount={feature.collectedAmount} 
            />
          ))}
        </div>
      </PageLayout>
    </Viewport>
  );
}
