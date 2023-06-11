// pages/profile.js

import { auth } from '../firebase';
import Viewport from '../components/Viewport';
import PageLayout from '../components/PageLayout';
import { withAuth } from '../utils/auth';

const ProfilePage = () => {
  const title = 'Profile';
  const description = 'This is your profile page';
  const headerObjects = [
    { icon: '' },
    { icon: '', onClick: () => console.log('Perform action') },
  ];

  return (
    <Viewport>
      <PageLayout title={title} description={description} headerObjects={headerObjects}>
        <div className="body">
          {/* Body content */}
        </div>
        <div className="footer">
          {/* Footer content */}
        </div>
      </PageLayout>
    </Viewport>
  );
};

export default withAuth(ProfilePage);
