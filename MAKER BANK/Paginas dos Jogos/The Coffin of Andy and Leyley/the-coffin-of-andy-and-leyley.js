const downloadLink = document.getElementById('download-link');

downloadLink.addEventListener('click', async () => {
    if (!window.chrome || !chrome.fileSystem) {
        alert('Funcionalidade indisponível neste navegador.');
        return;
    }

    const folderName = 'The Coffin of Andy and Leyley'; // Nome da pasta a ser baixada
    const files = [
        'Todos os Jogos/',
        'The Coffin of Andy and Leyley',
        'The Coffin of Andy and Leyley',
    ];

    try {
        const writableDirectory = await chrome.fileSystem.requestWritableDirectory(folderName);
        await Promise.all(files.map(async (file) => {
            const fileEntry = await writableDirectory.getFile(file);
            if (!fileEntry.exists) {
                await fileEntry.createWriter().write(await fetch(file).arrayBuffer());
            }
        }));

        alert('Pasta baixada com sucesso!');
    } catch (error) {
        console.error(error);
        alert('Falha ao baixar pasta.');
    }
});
