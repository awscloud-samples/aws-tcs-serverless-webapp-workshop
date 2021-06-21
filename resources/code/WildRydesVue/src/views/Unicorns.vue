<template>
<div class="page-unicorns">
    
    <menus class="site-header" :extraHeader="true" :title="title" :logoColor="'dark'"  />

 <div class="row column medium-10 large-8 xxlarge-6">
    <p class="content">
      Wild Rydes has a dedicated staff that recruits, trains, and tends to our herd of cars. We take great pride in the quality of cars and rydes that we provide to our customers, and our staff exercises the utmost care in vetting the cars that join our herd.
    </p>
    <p class="content">
      Every car goes through a rigorous due diligence process where we perform background checks, flying exams, and several rounds of interviews. Cars accepted to Wild Rydes are then treated to the best care and maintenance possible. We provide them excellent benefits, health care, and employee perks. This is part of our company philosophy in which happy cars lead to happy customers.
    </p>
    <p class="content">Meet a few of the cars that are part of our family.</p>
  </div>

  <section class="unicorns-list">

    <div class="row">
      <div class="unicorn jimmy">
        <div class="columns medium-5 large-6 xlarge-5 xlarge-offset-1">
          <img src="images/wr-unicorn-one.png" alt="Jimmy Three Legs">
        </div>

        <div class="columns medium-7 large-6 xlarge-5 xxlarge-4">
          <h2 class="title">Tesla Model 3</h2>
          <div class="subtitle">M3</div>
          <p class="content">
            Tesla Model 3 joined Wild Rydes in February 2016 and has been giving rydes almost daily. He says he most enjoys getting to know each of his ryders, which makes the job more interesting for him. In his spare time, Tesla model 3 enjoys watching sunsets and playing Pokemon Go.
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="unicorn henry">
        <div class="columns medium-5 medium-push-7 large-6 large-push-6 xlarge-5 xlarge-offset-1 xlarge-push-5">
          <img src="images/wr-unicorn-two.png" alt="Hot Shoe Henry">
        </div>

        <div class="columns medium-7 medium-pull-5 large-6 large-pull-6 xlarge-5 xlarge-pull-5 xxlarge-4 xxlarge-offset-1">
          <h2 class="title">Hellcat</h2>
          <div class="subtitle">Kitty</div>
          <p class="content">
            Hellcat joined Wild Rydes after completing a distinguished career in the military, where he toured the world in many critical missions. Hellcat enjoys impressing his ryders with magic tricks that he learned from his previous owner.
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="unicorn veronica">
        <div class="columns medium-5 large-6 xlarge-5 xlarge-offset-1">
          <img src="images/wr-unicorn-three.png" alt="Veronica">
        </div>

        <div class="columns medium-7 large-6 xlarge-5 xxlarge-4">
          <h2 class="title">Golf GTI</h2>
          <div class="subtitle">The machine</div>
          <p class="content">
            Golf GTI recently joined the Wild Rydes team in Madrid, Spain. He is instrumental in forming Wild Rydes’ Spanish operations after a long, distinguished acting career in windmill shadow-jousting.
          </p>
        </div>
      </div>
    </div>
  </section>
  <footers />
</div>

</template>

<script>
import footers from '@/components/footer.vue'
import menu from '@/components/menu.vue'

export default {
  name: 'unicorns',
  data(){
    return{
      title:"Super Cars Are Our Friends",
      content:"The app is what makes this service exist, but the cars make it move. Meet them and see who you are riding with!"
    }
  },
  components: {
    footers: footers,
    menus: menu
  },
}
</script>

