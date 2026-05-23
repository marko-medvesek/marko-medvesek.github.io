const imageUrls = [
"https://kamere.dars.si/kamere/Bazara/Ajdovscina_smer_GO.jpg",
"https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km9_5_VN0774_10.jpg",
"https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km8_4a_VN0774_09.jpg",
"https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km5_4a_VN0774_06.jpg",
"https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km4_3_VN0774_08.jpg",
"https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km05_VN0774_01.jpg",
"https://kamere.dars.si/kamere/Nanos/CP_Nanos_Panorama_LJ.jpg",
"https://kamere.dars.si/kamere/Kozina/Dilce_2.jpg",
"https://kamere.dars.si/kamere/Kozina/Dilce_1.jpg",
"https://kamere.dars.si/kamere/Kozina/Portal_P3_Studenec.jpg",
"https://kamere.dars.si/kamere/msc2pics/Portal%20Unec%20smer%20KP.jpg",
"https://kamere.dars.si/kamere/msc2pics/Portal%20Unec%20smer%20LJ.jpg",
"https://kamere.dars.si/kamere/msc2pics/Kam15_IVANJE_SELO_LJ.jpg",
"https://kamere.dars.si/kamere/msc2pics/Kam9_IVANJE_SELO_KP.jpg",
"https://kamere.dars.si/kamere/msc2pics/kam7_Lom_KP.jpg",
"https://kamere.dars.si/kamere/msc2pics/Kam8_LOM_LJ.jpg",
"https://kamere.dars.si/kamere/Vrhnika/Stempetov_most_LJ.JPG",
"https://kamere.dars.si/kamere/Kozina/Stempetov_most_LJ.jpg",
"https://kamere.dars.si/kamere/Kozina/Stempetov_most_KP.jpg",
"https://kamere.dars.si/kamere/Vrhnika/Verd_KP.JPG",
"https://kamere.dars.si/kamere/Vrhnika/Sinja_gorica_LJ.JPG",
"https://kamere.dars.si/kamere/msc2pics/Cam21_SPEED_VHOD.jpg",
"https://kamere.dars.si/kamere/msc2pics/Cam22_SPEED_IZHOD.jpg",
"https://kamere.dars.si/kamere/Sentvid_Jug/cam11.jpg",
"https://kamere.dars.si/kamere/Sentvid_Jug/cam8.jpg",
"https://kamere.dars.si/kamere/Sentvid_Jug/cam6.jpg",
"https://kamere.dars.si/kamere/Sentvid_Jug/cam5.jpg",
"https://kamere.dars.si/kamere/Sentvid_Jug/cam12.jpg",
"https://kamere.dars.si/kamere/Sentvid_Jug/cam1.jpg"
];


let currentIndex = 0;
const liveImage = document.getElementById('liveImage');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');

function updateImage() {
    const currentUrl = imageUrls[currentIndex] + "?t=" + new Date().getTime();
    liveImage.src = currentUrl;
    modalImage.src = currentUrl;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    updateImage();
}

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

// Initial image load
updateImage();

// Update the image every second to get the latest version
setInterval(updateImage, 1000);

// Keyboard controls for desktop users
document.addEventListener('keydown', function(event) {
    if (modal.style.display === "flex") {
        if (event.key === 'ArrowRight') {
            nextImage();
        } else if (event.key === 'ArrowLeft') {
            prevImage();
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }
});

// Swipe functionality for mobile users
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
    if (touchEndX < touchStartX) {
        nextImage();
    }
    if (touchEndX > touchStartX) {
        prevImage();
    }
}

modal.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

modal.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
}, false);
