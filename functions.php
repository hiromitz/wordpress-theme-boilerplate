<?php

$includes = [
  'lib/setup.php',     // Theme setup
  'lib/wrapper.php',   // Theme wrapper class
];
foreach ($includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf('Error locating %s for inclusion', $file), E_USER_ERROR);
  }
  require_once $filepath;
}
unset($includes, $file, $filepath);


function sol_assets($path) {
  return get_template_directory_uri(). '/assets/'. $path;
}
