import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

let echo;

const key = process.env.REACT_APP_PUSHER_APP_KEY;
const cluster = process.env.REACT_APP_PUSHER_APP_CLUSTER;

if (key && cluster) {
    const options = {
        broadcaster: 'pusher',
        key: key,
        cluster: cluster,
        forceTLS: true
    };
    
    echo = new Echo({
        ...options,
        client: new Pusher(options.key, options)
    });
} else {
    console.warn('Pusher credentials not found in .env file. Real-time features will be disabled.');
    // Create a mock echo instance to prevent crashes in components that use it.
    echo = {
        channel: () => ({
            listen: () => {}
        }),
        leaveChannel: () => {},
    };
}

export default echo;