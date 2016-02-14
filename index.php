<div class="container">
  <div class="row">
    <div class="col-md-8 blog-main">
      <?php if (!have_posts()) : ?>
        <div class="alert alert-warning">
          Sorry, no results were found.
        </div>
        <?php get_search_form(); ?>
      <?php endif; ?>

      <?php while (have_posts()) : the_post(); ?>
        <?php get_template_part('templates/content', get_post_format()); ?>
      <?php endwhile; ?>
    </div>
    <div class="col-md-3 offset-md-1 blog-sidebar">
      <?php get_template_part('templates/sidebar'); ?>
    </div>
  </div>
</div>
