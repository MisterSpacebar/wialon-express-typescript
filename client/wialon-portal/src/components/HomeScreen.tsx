import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../App';


// WARNING: this component requires the User component to be refreshed
// Otherwise, the user data will not be updated and will be stuck on loading
function HomeScreen() {
    const { setData } = useContext(DataContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleLoginSuccess = (event: MessageEvent) => {
          console.log('event:', event.data);
          

          // Check if the message is a login success message
          // If the message is a login success message, redirect the user to the user page
          // If the message is not a login success message, parse the message and update the user data
          if (event.data === 'login-success') {
            console.log(event.data);
            navigate('/user'); // replace with your page URL
            // Add your code here
            window.removeEventListener('message', handleLoginSuccess); // Stop listening for message events
            window.location.reload();
          } else {
            try {
              let userData = JSON.parse(event.data);
              console.log("post message data: " + JSON.stringify(userData));
              setData(userData);
              navigate('/user');
              window.removeEventListener('message', handleLoginSuccess); // Stop listening for message events
              window.location.reload();
            } catch (error) {
              // The message is not a JSON string. Ignore it.
              console.log('The message is not a JSON string. Ignore it.\n Error:', error);
              // console.log(event.data)
            }
          }
        };
      
        // Add an event listener to listen for messages from the login window
        // The event listener will call the handleLoginSuccess function when a message is received
        window.addEventListener('message', handleLoginSuccess);
      
        // Clean up the event listener
        return () => {
          window.removeEventListener('message', handleLoginSuccess);
        };
      }, []);
    
      // Function to handle the login button click
      const handleLogin = () => {
        let height = 500;
        let width = 500;
        let left = (screen.width - width) / 2;
        let top = (screen.height - height) / 2;
        // Open the login window
        // redirect_uri should be the URL of the page that will handle the login response
        window.open('https://hosting.wialon.us/login.html?access_type=-1&activation_time=0&duration=0&lang=en&flags=0&response_type=token&redirect_uri=http://172.16.1.202:3000/redirect','Login', `width=${width},height=${height},left=${left},top=${top}`);
      };
    
  return (
    <div className="jumbotron jumbotron-fluid main-jumbo">
        <Card className='main-page title-card band-card'>
            <Card.Body>
                <Card.Title className='title'>
                    <h1>Wialon Portal</h1>
                </Card.Title>
                <br></br>
                <Card.Text>
                    <div className='login-buttons'>
                        <Button className='login-button' variant="info" onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  );
}

export default HomeScreen;