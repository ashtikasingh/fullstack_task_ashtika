import { useEffect } from 'react';
import mqtt from 'mqtt';

export const useMqtt = () => {
    const client = mqtt.connect('ws://test.mosquitto.org:8080');

    useEffect(() => {
        client.on('connect', () => {
            console.log('MQTT connected');
        });

        return () => {
            client.end();
        };
    }, []);

    const publishNote = (note: string) => {
        client.publish('/add', note);
    };

    return { publishNote };
};
