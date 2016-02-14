<div class="blog-masthead">
  <div class="container">
    <?php
    if (has_nav_menu('primary_navigation')) :
      wp_nav_menu([
        'container' => 'nav',
        'container_class' => 'blog-nav',
        'theme_location' => 'primary_navigation',
        'menu_class' => 'nav'
      ]);
    endif;
    ?>
  </div>
</div>
