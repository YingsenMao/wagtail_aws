function PortfolioProject(img_link, title, github_link, description) {
    this.img_link = img_link;
    this.title = title;
    this.github_link = github_link;
    this.description = description; 
}

var portfolio = [
    new PortfolioProject('assets/images/terpbooks.png', 'TerpBooks', 'https://github.com/xjtian/TerpBooks', 'Textbook exchange website for UMD students, <a href="http://terpbooks.com">terpbooks.com</a>.'),
    new PortfolioProject('assets/images/prim.png', 'Primannum UMD Website', null, 'Full-stack development on a new website for the Primannum Honor Society, <a href="http://primannumumd.org">primannumumd.org</a>.'),
    new PortfolioProject('assets/images/200px-Half_Adder.svg.png', 'lcsim', 'https://github.com/xjtian/lcsim', 'Python library for building, simulating, and analyzing complex boolean circuits.'),
    new PortfolioProject('assets/images/flat-ui.png', 'Flat-UI Tumblr Theme', 'https://github.com/xjtian/flat-ui-tumblr', 'Simple flat theme for Tumblr blogs.'),
    new PortfolioProject('assets/images/pyscrabble.png', 'PyScrabble', 'https://github.com/xjtian/PyScrabble', 'Scrabble game with AI move generator written in Python.'),
    new PortfolioProject('assets/images/ox.png', 'Theta Chi UMD Website', null, "Full-stack development on a new website for UMD's Theta Chi chapter, <a href=\"http://thetachiumd.org\">thetachiumd.org</a>."),
    new PortfolioProject('assets/images/aoodshooter.png', 'AOOD 2D Shooter', 'https://github.com/xjtian/aood-2d-shooter', '2D scrolling shooter Java applet, inspired by the java4k submission left4kdead.')
];

function render_portfolio($container) {
    var inner_img_tmpl = $('#project-img-tmpl').html();
    var project_tmpl = $('#project-tmpl').html();
    var click_tmpl = $('#project-click-tmpl').html();

    var rendered = Mustache.render(project_tmpl, {projects: portfolio}, {inner: inner_img_tmpl});

    $container.html(rendered);
    $container.find('.project-card').mouseenter(function() {
        var img_link = $(this).find('img').attr('src');
        var prev_height = $(this).height();

        for (var i = 0; i < portfolio.length; i++) {
            if (portfolio[i].img_link == img_link) {
                var inner_rendered = Mustache.render(click_tmpl, {project: portfolio[i]}) ;

                $(this).html(inner_rendered);
                $(this).height(prev_height);
            }
        }
    });

    $container.find('.project-card').mouseleave(function() {
        var proj_title = $(this).find('h4').text();
        proj_title = proj_title.replace(/^\s+|\s+$/g, "");

        for (var i = 0; i < portfolio.length; i++) {
            if (portfolio[i].title == proj_title) {
                inner_rendered = Mustache.render(inner_img_tmpl, {img_link: portfolio[i].img_link});

                $(this).html(inner_rendered);
                $(this).css('height', '');
            }
        }
    });
}