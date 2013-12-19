$(document).ready(function() {

    $('.codeview .data').each( function() {
        var $this = $(this);
        var content = $this.text();
        content = content.replace(/^\n/, "");
        content = content.replace(/\s*$/, "");
        $this.text(content);
        var editmode = 'js';
        var editor = ace.edit( this );

        var m = $this.attr('data-type');
        if ( m !== undefined && m != "" ) {
            editmode = m;
        }

        editor.setTheme("ace/theme/coder");
        editor.getSession().setMode( 'ace/mode/' + editmode );
        editor.setBehavioursEnabled( false );
        editor.setHighlightActiveLine( false );
        editor.setReadOnly( true );
        editor.getSession().setUseWrapMode(true);
        editor.renderer.setShowGutter( false ); //disable line numbers

        //automatically adjust height to fit content
        var updateHeight = function() {
            var h = editor.getSession().getScreenLength()
                    * editor.renderer.lineHeight
                    + editor.renderer.scrollBar.getWidth();
            $this.height( h + "px" );
            editor.resize();
        };
        updateHeight();
        editor.getSession().on('change', updateHeight);

    });

    //GA Tracking for tagged outlinks and downloads
    $('a.trackout').click(function() {
      var destination = $(this).attr('href');      
      ga('send', 'event', 'outbound', 'click', destination ); 
    });
    $('a.trackdl').click(function() {
      var destination = $(this).attr('href');      
      ga('send', 'event', 'download', 'click', destination ); 
    });
});

