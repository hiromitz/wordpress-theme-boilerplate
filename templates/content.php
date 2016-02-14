<article <?php post_class(array('blog-post')); ?>>
  <header>
    <h2 class="blog-post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <p class="blog-post-meta"><time class="updated" datetime="<?= get_post_time('c', true); ?>"><?= get_the_date(); ?></time> by <a href="<?= get_the_author_meta('url'); ?>" rel="author" class="fn"><?= get_the_author(); ?></a></p>
  </header>

  <?php the_content(); ?>

</article>
