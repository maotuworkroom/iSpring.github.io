(function() {
    function forkMeOnGitHub() {
        //https://github.com/blog/273-github-ribbons
        //http://tholman.com/github-corners/
        var a = document.createElement("a");
        a.style.cssText = "position:fixed;right:0;top:0;z-index:1002;";
        a.target = "_blank";
        a.href = "https://github.com/iSpring/";
        a.innerHTML = '<img style="position:absolute; top:0; right:0; left:auto; bottom:auto; border:0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png">';
        document.body.append(a);
    }

    forkMeOnGitHub();

    var containerNode = document.getElementById("custom_column_21591691");
    if (!containerNode) {
        return;
    }

    var panelBody = $(".panel_body", containerNode)[0];

    if (panelBody) {
        panelBody.style.textAlign = "center";
    }

    var repoNames = ["WebGlobe", "GamePlane"];

    function getRepoInfo(data, repoName) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name === repoName) {
                return data[i];
            }
        }
        return null;
    }

    function createRepoNode(repoInfo, parentNode) {
        //https://img.shields.io/github/stars/iSpring/WebGlobe.svg
        // var starBadgeUrl = "https://img.shields.io/github/stars/iSpring/" + repoInfo.name + ".svg";

        //https://ghbtns.com/github-btn.html?user=iSpring&repo=WebGlobe&type=star&count=true
        var starBadgeUrl = 'https://ghbtns.com/github-btn.html?user=iSpring&repo=' + repoInfo.name + '&type=star&count=true';

        var str = '' +
            '<a style="display:inline-block;color:#3d84b0;padding:15px;text-decoration:none;" target="_blank">' +
            '<div>' +
            '<span class="repo-name" style="display:inline-block;height:24px;line-height:24px;vertical-align:middle;"></span>' +
            // '<img class="star-badge" style="height:20px;vertical-align:middle;margin-left:20px;" src="' + starBadgeUrl + '" />' +
            '<iframe class="star-badge" src="' + starBadgeUrl + '" frameborder="0" scrolling="0" width="120px" height="20px" style="vertical-align:middle;margin-left:20px;"></iframe>' +
            '</div>' +
            '<div class="repo-description"></div>' +
            '</a>';
        var a = $(str);
        a.attr("href", repoInfo.html_url);
        $(".repo-name", a).text(repoInfo.name);
        $(".repo-description", a).text(repoInfo.description);
        a.appendTo(parentNode);
    }

    $.ajax("https://api.github.com/users/iSpring/repos", {
        dataType: 'json',
        data: {},
        complete: function(response) {
            var data = response.responseJSON;
            $.each(repoNames, function(i, repoName) {
                var repoInfo = getRepoInfo(data, repoName);
                if (repoInfo) {
                    createRepoNode(repoInfo, containerNode);
                }
            });
        }
    });
})();