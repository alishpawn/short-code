  var boxes = document.querySelectorAll('.hover-box');

  boxes.forEach(function (box) {
    var overlay = box.querySelector('.overlay');
    var leaveTimer;

    box.addEventListener('mouseenter', function (e) {
      clearTimeout(leaveTimer);
      var direction = getDirection(box, e);
      var pos = getTranslateValues(direction);
      console.log('enter direction:', ['left', 'top', 'right', 'bottom'][direction], '| start from:', 'translate(' + pos.x + ', ' + pos.y + ')');

      overlay.style.transition = 'none';
      void overlay.offsetHeight;
      overlay.style.transform = 'translate(' + pos.x + ', ' + pos.y + ')';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.style.transition = 'transform 0.35s ease';
          overlay.style.transform = 'translate(0, 0)';
        });
      });
    });

    box.addEventListener('mouseleave', function (e) {
      var direction = getDirection(box, e);
      var pos = getTranslateValues(direction);
      console.log('leave direction:', ['left', 'top', 'right', 'bottom'][direction]);

      overlay.style.transition = 'transform 0.35s ease';
      overlay.style.transform = 'translate(' + pos.x + ', ' + pos.y + ')';

      leaveTimer = setTimeout(function () {
        overlay.style.transition = 'none';
        overlay.style.transform = '';
      }, 360);
    });
  });

  function getDirection(el, e) {
    var rect = el.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var d = [
      x,               // 0: left
      y,               // 1: top
      rect.width - x,  // 2: right
      rect.height - y  // 3: bottom
    ];
    return d.indexOf(Math.min.apply(null, d));
  }

  function getTranslateValues(direction) {
    var map = [
      { x: '-100%', y: '0%' },
      { x: '0%', y: '-100%' },
      { x: '100%', y: '0%' },
      { x: '0%', y: '100%' }
    ];
    return map[direction];
  }