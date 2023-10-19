// pages/profile.js

// import { auth } from '../firebase';
import Viewport from '../components/Viewport';
import PageLayout from '../components/PageLayout';
import { withAuth } from '../utils/auth';
import { useAuth } from '../src/contexts/AuthContext';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  // console.log('ProfilePage currentUser', currentUser);
  // console.log('ProfilePage currentUser', currentUser.displayName);
  const title = 'Profile';
  const description = 'This is your profile page';
  const headerObjects = [
    { icon: '' },
    { icon: '', onClick: () => console.log('Perform action') },
  ];

  return (
    <Viewport>
      <PageLayout title={title} description={description} headerObjects={headerObjects}>
        {currentUser &&
        <div className="body">
          {/* Body content */}
          
          <h1>Welcome, {currentUser.displayName}!</h1>
          <img src={currentUser.photoURL} />
          <p>displayName: {currentUser.displayName}</p>
          {currentUser.email && <p>email: {currentUser.email}</p>}
          {currentUser.handle && <p>handle: @{currentUser.handle}</p>}
          <p>authService: {currentUser.authService}</p>
        </div>}
        {/* <div className="footer">
        </div> */}
      </PageLayout>
    </Viewport>
  );
};

export default withAuth(ProfilePage);
