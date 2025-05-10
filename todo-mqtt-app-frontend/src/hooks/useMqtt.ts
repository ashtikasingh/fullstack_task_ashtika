import { useEffect, useRef } from 'react';
import mqtt, { MqttClient } from 'mqtt';

export const useMqtt = () => {
    const clientRef = useRef<MqttClient | null>(null);

    useEffect(() => {
        const client = mqtt.connect('ws://test.mosquitto.org:8080');
        clientRef.current = client;

        client.on('connect', () => {
            console.log('MQTT connected');
        });

        client.on('error', (err) => {
            console.error('MQTT error:', err);
            client.end();
        });

        client.on('close', () => {
            console.log('MQTT disconnected');
        });

        return () => {
            client.end();
        };
    }, []);

    const publishNote = (note: string) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish('/add', note);
        } else {
            console.warn('MQTT client not connected');
        }
    };

    return { publishNote };
};
