(function () {
  function $(id) {
    return document.getElementById(id);
  }

  var card = $('card'),
    openB = $('open'),
    closeB = $('close'),
    polaroidImg = document.querySelector('.polaroid .img'),
    timer = null,
    currentPage = 0,
    pages = document.querySelectorAll('.page');

  // Images to cycle through
  const pageImages = [
    '1IMG_20200821_222649_571.jpg',
    '1IMG_20201115_003638_383.jpg',
    '1IMG-20210821-WA0017.jpg'
  ];

  // Initially activate the first page
  pages[0].classList.add('active');

  function resetPages() {
    pages.forEach(page => page.classList.remove('active'));
  }

  function updateCardPage(newPageIndex) {
    // Ensure card is fully open
    if (!card.classList.contains('open-fully')) return;

    // Add page flip animation
    card.classList.add('page-flip');

    setTimeout(() => {
      // Reset pages and activate new page
      resetPages();
      pages[newPageIndex].classList.add('active');

      // Update image
      polaroidImg.style.backgroundImage = `url('${pageImages[newPageIndex]}')`;

      // Remove flip animation class
      card.classList.remove('page-flip');
    }, 500); // Matches the transition time
  }

  openB.addEventListener('click', function () {
    card.setAttribute('class', 'open-half');
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute('class', 'open-fully');
      resetPages();
      pages[0].classList.add('active');
      currentPage = 0;
      polaroidImg.style.backgroundImage = `url('${pageImages[0]}')`;
      timer = null;
    }, 1000);
  });

  closeB.addEventListener('click', function () {
    card.setAttribute('class', 'close-half');
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute('class', '');
      resetPages();
      timer = null;
    }, 1000);
  });

  // Add page navigation functionality
  document.addEventListener('click', function (e) {
    if (card.classList.contains('open-fully')) {
      // Check if click is on right side of the card to go to next page
      var cardRect = card.getBoundingClientRect();
      var isRightSide = e.clientX > (cardRect.left + cardRect.width / 2);

      if (isRightSide && currentPage < pages.length - 1) {
        // Go to next page
        currentPage++;
        updateCardPage(currentPage);
      } else if (!isRightSide && currentPage > 0) {
        // Go to previous page
        currentPage--;
        updateCardPage(currentPage);
      }
    }
  });
}());