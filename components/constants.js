import good_morning from '../assets/good_morning.png';
import good_night from '../assets/good_night.png';
import joke from '../assets/joke1.png';
import trending from '../assets/trending.jpg';
import motivation from '../assets/motivation.jpg';
import download from '../assets/download.png';
import friendship from '../assets/friendship.jpg';
import birthday from '../assets/birthday.png';
import king from '../assets/Shivaji_maharaj_Logo.png';
import shayari from '../assets/Social_Media_Logo.png';
import love from '../assets/love1.jpg';
import festivals from '../assets/festivals.png'

const statusIcons = {
    "array": [
        {
            title: 'ट्रेंडिंग',
            image_url: trending,
            englishTitle: 'Trending'
        },
        {
            title: 'शुभ प्रभात',
            image_url: good_morning,
            englishTitle: 'Good_Morning'
        },
        {
            title: 'शुभ रात्री',
            image_url: good_night,
            englishTitle: 'Good_Night'
        },
        {
            title: 'विनोद',
            image_url: joke,
            englishTitle: 'Jokes'
        },
        {
            title: 'वाढदिवस',
            image_url: birthday,
            englishTitle: 'Birthday'
        },
        {
            title: 'सण-उत्सव',
            image_url: festivals,
            englishTitle: 'Festivals'
        },
        {
            title: 'मित्रता',
            image_url: friendship,
            englishTitle: 'Friendship'
        },
        {
            title: 'प्रेरणा',
            image_url: motivation,
            englishTitle: 'Motivation'
        },
        
        {
            title: 'प्रेम',
            image_url: love,
            englishTitle: 'Love'
        },
        {
            title: 'महाराज',
            image_url: king,
            englishTitle: 'King'
        },
        {
            title: 'सोशल',
            image_url: shayari,
            englishTitle: 'Shayari'
        },
        {
            title: 'डाउनलोड',
            englishTitle: 'Download',
            image_url: download
        }
    ]
}


const dummyData = {
    array: [
        {
            id: 1,
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7IkCZgLz3AqddmprgOBQ3KOyPiEIOVT-PQ&usqp=CAU'
        },
        {
            id: 2,
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlZFS2WzxAIkV80awLfuPGuHAe_Ek5JQt66kgxxOKhvg7iiIZwaNcl3cTeyCe0PtWhXMI&usqp=CAU'
        },
        {
            id: 3,
            image_url: 'https://www.sanjayjangam.com/wp-content/uploads/2021/03/attitude-status-in-marathi.jpg'
        },
        {
            id: 4,
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-8FFBJfrBuYaRc7ztdIgHxQ6fZvABAEN48zrBFVbg_1XbmdlMl4meq4Rdbwdf-dJbYA&usqp=CAU'
        },
        {
            id: 5,
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7IkCZgLz3AqddmprgOBQ3KOyPiEIOVT-PQ&usqp=CAU'
        },
        {
            id: 6,
            image_url: 'https://firebasestorage.googleapis.com/v0/b/status-app-react-native.appspot.com/o/Festivals%2FIMG-20211015-WA0005.jpg?alt=media&token=b0c377b4-4309-4a6a-9b0b-eb482bda2841'
        },
        {
            id: 7,
            image_url: 'https://firebasestorage.googleapis.com/v0/b/status-app-react-native.appspot.com/o/Festivals%2FIMG-20211015-WA0001.jpg?alt=media&token=315dfb69-d508-4840-8f49-3accbae14545'
        },
        {
            id: 8,
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-8FFBJfrBuYaRc7ztdIgHxQ6fZvABAEN48zrBFVbg_1XbmdlMl4meq4Rdbwdf-dJbYA&usqp=CAU'
        },
        {
            id: 9,
            image_url: 'https://www.lovesove.com/wp-content/uploads/2019/07/Whatsapp-Images-for-DP-friendship-status-in-marathi-LoveSove.jpg'
        }
    ]
}

const COLORS = {
    primary: "#9C27B0",
    secondary: "#EACFEF",
    white: "#ffffff",
    black: "#000000",
    shadowColor: "#500566",
    gray: "#F5F5F5"
}


export  {statusIcons,COLORS, dummyData};