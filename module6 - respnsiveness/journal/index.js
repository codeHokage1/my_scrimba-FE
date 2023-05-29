const viewMore = document.querySelector('.view-more');
const allHidden = document.querySelectorAll('.hidden')

viewMore.addEventListener('click', () => {
   allHidden.forEach(post => {
      post.classList.toggle('hidden')
   })
   if (viewMore.textContent === 'View More') {
      viewMore.textContent = 'View Less'
   } else {
      viewMore.textContent = 'View More'
   }
})