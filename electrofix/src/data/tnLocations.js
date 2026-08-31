const baseDistricts = [
    { name: 'Ariyalur', lat: 11.139, lng: 79.073 },
    { name: 'Chengalpattu', lat: 12.695, lng: 79.976 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
    { name: 'Cuddalore', lat: 11.7480, lng: 79.7714 },
    { name: 'Dharmapuri', lat: 12.1211, lng: 78.1582 },
    { name: 'Dindigul', lat: 10.3624, lng: 77.9695 },
    { name: 'Erode', lat: 11.3410, lng: 77.7172 },
    { name: 'Kallakurichi', lat: 11.7383, lng: 78.9639 },
    { name: 'Kanchipuram', lat: 12.8342, lng: 79.7036 },
    { name: 'Kanyakumari', lat: 8.0883, lng: 77.5385 },
    { name: 'Karur', lat: 10.9601, lng: 78.0766 },
    { name: 'Krishnagiri', lat: 12.5186, lng: 78.2137 },
    { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
    { name: 'Mayiladuthurai', lat: 11.1085, lng: 79.6534 },
    { name: 'Nagapattinam', lat: 10.7672, lng: 79.8433 },
    { name: 'Namakkal', lat: 11.2189, lng: 78.1673 },
    { name: 'Nilgiris', lat: 11.4102, lng: 76.6950 },
    { name: 'Perambalur', lat: 11.2342, lng: 78.8821 },
    { name: 'Pudukkottai', lat: 10.3833, lng: 78.8001 },
    { name: 'Ramanathapuram', lat: 9.3639, lng: 78.8364 },
    { name: 'Ranipet', lat: 12.9287, lng: 79.3323 },
    { name: 'Salem', lat: 11.6643, lng: 78.1460 },
    { name: 'Sivaganga', lat: 9.8433, lng: 78.4809 },
    { name: 'Tenkasi', lat: 8.9589, lng: 77.3142 },
    { name: 'Thanjavur', lat: 10.7870, lng: 79.1378 },
    { name: 'Theni', lat: 10.0104, lng: 77.4768 },
    { name: 'Thoothukudi', lat: 8.7642, lng: 78.1348 },
    { name: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047 },
    { name: 'Tirunelveli', lat: 8.7139, lng: 77.7567 },
    { name: 'Tirupathur', lat: 12.4939, lng: 78.5639 },
    { name: 'Tiruppur', lat: 11.1085, lng: 77.3411 },
    { name: 'Tiruvallur', lat: 13.1416, lng: 79.9073 },
    { name: 'Tiruvannamalai', lat: 12.2253, lng: 79.0747 },
    { name: 'Tiruvarur', lat: 10.7733, lng: 79.6361 },
    { name: 'Vellore', lat: 12.9165, lng: 79.1325 },
    { name: 'Viluppuram', lat: 11.9401, lng: 79.4861 },
    { name: 'Virudhunagar', lat: 9.5873, lng: 77.9614 }
];

const dummyTalukNames = ['North', 'South', 'East', 'West', 'Central', 'City', 'Rural', 'Industrial', 'Hill', 'Valley'];
const dummyVillageNames = ['Palayam', 'Nagar', 'Kuppam', 'Patti', 'Pudur', 'Ur', 'Kottai', 'Valasi', 'Medu', 'Kudi', 'Vadi', 'Cholam', 'Malai', 'Karai', 'Kadu'];

// Generate a hierarchical structure
export const tnLocationData = {
    state: 'Tamil Nadu',
    districts: baseDistricts.map(district => {
        // Generate 3-5 Taluks for each district
        const numTaluks = Math.floor(Math.random() * 3) + 3;
        const taluks = [];
        
        for (let i = 0; i < numTaluks; i++) {
            const talukName = `${district.name} ${dummyTalukNames[Math.floor(Math.random() * dummyTalukNames.length)]} Taluk`;
            const talukLat = district.lat + (Math.random() - 0.5) * 0.1;
            const talukLng = district.lng + (Math.random() - 0.5) * 0.1;

            // Generate 3-5 Villages for each Taluk
            const numVillages = Math.floor(Math.random() * 3) + 3;
            const villages = [];

            for (let j = 0; j < numVillages; j++) {
                const villagePrefix = ['Ana', 'Mela', 'Kila', 'Pudu', 'Pazha', 'Siru', 'Peru', 'Vada', 'Then', 'Mel'][Math.floor(Math.random() * 10)];
                const villageSuffix = dummyVillageNames[Math.floor(Math.random() * dummyVillageNames.length)];
                const villageName = `${villagePrefix}${villageSuffix}`;
                
                villages.push({
                    name: villageName,
                    lat: talukLat + (Math.random() - 0.5) * 0.05,
                    lng: talukLng + (Math.random() - 0.5) * 0.05,
                });
            }

            taluks.push({
                name: talukName,
                lat: talukLat,
                lng: talukLng,
                villages: villages
            });
        }

        return {
            ...district,
            taluks: taluks
        };
    })
};
