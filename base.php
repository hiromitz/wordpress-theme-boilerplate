<?php use SOL\Wrapper; ?>
<!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <?php wp_head(); ?>

  </head>
  <body <?php body_class(); ?>>
    <?php
      // Navigation parts
      get_template_part('templates/navbar');
    ?>

    <?php
      // Header parts
      get_template_part('templates/header');
    ?>

    <main class="main">
      <?php include SOL\Wrapper\template_path(); ?>
    </main><!-- /.main -->

    <?php
      // Footer parts
      do_action('get_footer');
      get_template_part('templates/footer');
      wp_footer();
    ?>
  </body>
</html>
