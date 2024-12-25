/*Mevcut tarihi ayarlamak için */
document.getElementById("nowdate").innerHTML = new Date().getFullYear()

/*Burası da menü toggle kontrol eden mekanizma*/
function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.getElementById("full-menu-list");
    const mainContent = document.getElementById("main-content")
    
    menuToggle.classList.toggle('active');
    window.scrollTo(0, 0); 
    
    if (menuToggle.classList.contains('active')) {
        
        menuList.classList.remove("display-none");
        mainContent.classList.add("display-none")

    } else {
        menuList.classList.add("display-none");
        mainContent.classList.remove("display-none")
    }
}