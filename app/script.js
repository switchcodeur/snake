window.onload = () => {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const canvas_width = canvas.width;
    const canvas_height = canvas.height;
    const tile_size = 10;

    var parts = [[0, 0]];
    var direction = "down";
    var apple = [parseInt(Math.random() * (canvas_width / tile_size)), parseInt(Math.random() * (canvas_height / tile_size))];

    const fps = 10;

    (function render() {
        move()

        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(
            apple[0] * canvas.width / canvas_width * tile_size,
            apple[1] * canvas.height / canvas_height * tile_size,
            canvas.width / canvas_width * tile_size,
            canvas.height / canvas_height * tile_size
        );

        for (var part = 0; part < parts.length; part++) {
            ctx.fillStyle = "rgb(0, 255, 0)";
            ctx.fillRect(
                parts[part][0] * canvas.width / canvas_width * tile_size,
                parts[part][1] * canvas.height / canvas_height * tile_size,
                canvas.width / canvas_width * tile_size,
                canvas.height / canvas_height * tile_size
            );
        }

        setTimeout(render, 1/fps*1000)
    })();

    document.addEventListener("keydown", (event) => {
        if (event.key == "ArrowUp") direction = "up";
        if (event.key == "ArrowDown") direction = "down";
        if (event.key == "ArrowRight") direction = "right";
        if (event.key == "ArrowLeft") direction = "left";
    });

    function move() {
        if (parts.length > 1) {
            parts.pop(parts.length - 1);
            parts.splice(0, 0, parts[0]);
        }

        if (direction == "up") parts[0][1]--;
        if (direction == "down") parts[0][1]++;
        if (direction == "right") parts[0][0]++;
        if (direction == "left") parts[0][0]--;

        if (parts[0][1] < 0) parts[0][1] = canvas_height / tile_size - 1;
        if (parts[0][1] > canvas_height / tile_size - 1) parts[0][1] = 0;
        if (parts[0][0] > canvas_width / tile_size - 1) parts[0][0] = 0;
        if (parts[0][0] < 0) parts[0][0] = canvas_width / tile_size - 1;

        if (parts.includes(parts[0], 2)) document.body.remove(canvas);
        console.log(parts)

        if (parts[0][0] == apple[0] && parts[0][1] == apple[1]) {
            if (direction == "up") parts[0][1]--;
            if (direction == "down") parts[0][1]++;
            if (direction == "right") parts[0][0]++;
            if (direction == "left") parts[0][0]--;
            apple = [parseInt(Math.random() * (canvas_width / tile_size)), parseInt(Math.random() * (canvas_height / tile_size))];
        }
    }
}