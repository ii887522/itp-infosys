<template>
  <main>
    <div class="content">
      <h2>Welcome to Internship Program</h2>
      <p>This is the platform to assign supervisor to student and view the supervisor</p>
      <ul class="counter">
        <li>
          <h3>
            <i class="fa-solid fa-user"></i>
            {{ studCount }}
          </h3>
          <span>Student</span>
        </li>
        <li>
          <h3>
            <i class="fa-solid fa-user"></i>
            {{ supervisorCount }}
          </h3>
          <span>Supervisor</span>
        </li>
      </ul>
      <q-btn class="btn" to="/admin/itp-prog/students">
        Search for Supervisor <i class="fa-solid fa-arrow-right"></i>
      </q-btn>
    </div>

    <div class="swiper-container">
      <div ref="swiper" class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-slide--one">
            <span>FAFB</span>
            <div class="slide-content">
              <h6>TAR UMT Premier institution for accounting and business cources in Malaysia.</h6>
            </div>
          </div>
          <div class="swiper-slide swiper-slide--two">
            <span>FOCS</span>
            <div class="slide-content">
              <h6>TAR UMT Premier institution for accounting and business cources in Malaysia.</h6>
            </div>
          </div>
          <div class="swiper-slide swiper-slide--three">
            <span>FOAS</span>
          </div>
          <div class="swiper-slide swiper-slide--four">
            <span>FOET</span>
          </div>
          <div class="swiper-slide swiper-slide--five">
            <span>FCCI</span>
          </div>
          <div class="swiper-slide swiper-slide--six">
            <span>FSSH</span>
            <div class="slide-content">
              <h3>Woman in the dark</h3>
            </div>
          </div>
        </div>
      </div>

      <div ref="swiperPagination" class="swiper-pagination"></div>
    </div>
    <div class="circle"></div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { useMeta } from 'quasar'
import { api } from 'boot/axios'

useMeta({ title: 'Internship Program | MyITPHub' })

const swiper = ref<HTMLDivElement | null>(null)
const swiperPagination = ref<HTMLDivElement | null>(null)
const studCount = ref('?')
const supervisorCount = ref('?')

;(async () => {
  const studCountResp = await api.get('/itp-prog/students/count')
  const supervisorCountResp = await api.get('/itp-prog/supervisors/count')
  studCount.value = `${studCountResp.data.result}`
  supervisorCount.value = `${supervisorCountResp.data.result}`
})()

onMounted(() => {
  new Swiper(swiper.value ?? '', {
    effect: 'coverflow',
    grabCursor: true,
    spaceBetween: 30,
    centeredSlides: false,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: false,
    },

    loop: true,
    pagination: {
      el: swiperPagination.value ?? '',
      clickable: true,
    },

    keyboard: {
      enabled: true,
    },

    mousewheel: {
      thresholdDelta: 70,
    },

    breakpoints: {
      460: {
        slidesPerView: 3,
      },

      768: {
        slidesPerView: 3,
      },

      1024: {
        slidesPerView: 3,
      },

      1600: {
        slidesPerView: 3.6,
      },
    },
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&amp;display=swap');
@import url('https://fonts.googleapis.com/css2?family=Courgette&amp;family=Noto+Serif+Vithkuqi:wght@500&amp;display=swap');
@import url('https://fonts.googleapis.com/css2?family=Chonburi&amp;display=swap');

html {
  font-size: 15px;
}
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}
body {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.referer-warning {
  background: black;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  padding: 0.75em;
  color: white;
  text-align: center;
  font-family: 'Lato', 'Lucida Grande', 'Lucida Sans Unicode', Tahoma, system-ui, Sans-Serif;
  line-height: 1.2;
  font-size: 1rem;
  position: relative;
  z-index: 2;
}
.referer-warning span {
  font-family: initial;
}
.referer-warning h1 {
  font-size: 1.2rem;
  margin: 0;
}
.referer-warning a {
  color: #56bcf9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
  position: relative;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

main {
  position: relative;
  min-height: 100vh;
  column-gap: 3rem;
  padding-block: min(20vh, 3rem);
  padding-inline: 2.3em;
  align-items: center;
  justify-content: center;
  background: #461356;
  overflow: hidden;
}
@media screen and (min-width: 960px) {
  main {
    display: flex;
    padding-inline: 0;
  }
}
main .content {
  width: 100%;
  color: #fff;
  position: relative;
  z-index: 2;
  margin-bottom: 3em;
}
@media screen and (min-width: 960px) {
  main .content {
    width: 40%;
    padding-left: 5em;
    margin-bottom: 0;
  }
}
main h2 {
  letter-spacing: 0.8px;
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 1.2;
}
main p {
  font-size: 1rem;
  line-height: 1.8;
  margin-inline: auto;
  margin-top: 10px;
}
main .counter {
  font-weight: 400;
  display: flex;
  align-items: center;
  margin: 2.5em 0 2em 0;
  gap: 2em;
}
main .counter i {
  margin-right: 10px;
}
main .counter span {
  display: block;
  text-transform: capitalize;
  font-size: 0.8rem;
  color: #c1c1c1;
  margin-top: 3px;
}
main .btn {
  background-color: #d51a6d;
  border: none;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  border-radius: 4px;
  transition: 0.3s ease-in;
}
main .btn i {
  margin-left: 15px;
}
main .btn:hover {
  background-color: #ae0a53;
}

.swiper-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  right: 0px;
  margin: 0 auto;
}
@media screen and (min-width: 960px) {
  .swiper-container {
    width: 60%;
    right: -60px;
  }
}

.swiper {
  position: relative;
  width: 100%;
  z-index: 2;
}

.swiper-slide {
  width: 10rem;
  height: 24rem;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  position: relative;
  border-radius: 12px;
  box-shadow: -1px 5px 15px #0000001f;
  text-align: center;
  opacity: 0.4;
  transition: opacity 0.4s ease-in;
}
.swiper-slide span {
  display: inline-block;
  background: #9926e1;
  border-radius: 0 50px 50px 0;
  text-transform: capitalize;
  padding: 12px 20px;
  letter-spacing: 0.5px;
  font-weight: 500;
  position: absolute;
  top: 2em;
  left: 0;
  color: #fff;
}
.swiper-slide h3 {
  color: #fff;
  font-size: 1.3rem;
  line-height: 1.4;
  margin-bottom: 0.625rem;
  letter-spacing: 0.8px;
  position: relative;
  word-wrap: break-word;
}
@media screen and (min-width: 800px) {
  .swiper-slide h3 {
    font-size: 1.8rem;
  }
}
.swiper-slide p {
  color: #fff;
  line-height: 1.6;
  font-size: 0.8rem;
}
.swiper-slide .slide-content {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -10px);
  width: 90%;
}
.swiper-slide--one {
  background: #0f2027;
  background: linear-gradient(to bottom, #2c536400, #203a4303, #0f2027cc),
    url('https://cdn.pixabay.com/photo/2023/03/12/20/58/ai-generated-7847847_1280.jpg') no-repeat 50% 50% / cover;
}
.swiper-slide--one h3 {
  font-family: 'Courgette', cursive;
  font-weight: 300;
}
.swiper-slide--two {
  background: linear-gradient(to bottom, #2c536400, #203a4303, #0f2027cc),
    url('https://cdn.pixabay.com/photo/2022/06/26/21/12/cover-7286312_1280.jpg') no-repeat 50% 50% / cover;
}
.swiper-slide--two h3 {
  font-family: 'Noto Serif Vithkuqi', serif;
  font-weight: 300;
}
.swiper-slide--three {
  background: url('https://upload.wikimedia.org/wikipedia/commons/9/92/THE_BOOK_cover_image.png') no-repeat 50% 50% /
    cover;
}
.swiper-slide--four {
  background: url('https://covers.audiobooks.com/images/covers/full/9781511358378.jpg') no-repeat 50% 50% / cover;
}
.swiper-slide--five {
  background: url('https://cdn.pixabay.com/photo/2015/02/20/16/59/deer-643340_1280.jpg') no-repeat 50% 50% / cover;
}
.swiper-slide--six {
  background: linear-gradient(to bottom, #2c536400, #203a4303, #0f2027cc),
    url('https://cdn.pixabay.com/photo/2022/11/04/23/15/woman-7570834_1280.jpg') no-repeat 50% 50% / cover;
}
.swiper-slide--six h3 {
  font-family: 'Chonburi', cursive;
  font-weight: 400;
}

.swiper-slide-active {
  display: grid;
  opacity: 1;
}

.swiper-pagination {
  position: relative;
  bottom: -0.313rem;
  text-align: center;
  margin-top: 35px;
  width: auto;
}
.swiper-pagination-bullet {
  border-radius: 0;
  width: 1.5rem;
  height: 0.25rem;
  background: #fff;
}
.swiper-pagination-bullet-active {
  background: #fff;
}

.circle {
  position: absolute;
  bottom: -5em;
  left: -8em;
  width: clamp(150px, 40vw, 400px);
  height: clamp(150px, 40vw, 400px);
  background: black;
  border-radius: 50%;
  z-index: 1;
  opacity: 0.7;
}
</style>
