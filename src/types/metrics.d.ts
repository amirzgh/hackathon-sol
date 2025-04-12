interface Metrics {
    venue: string,
    metrics: {
        internet_speed: number;
        crowdedness: number;
        charging_plug_availability: number;
        noise_level: number
    }
}

export {Metrics}