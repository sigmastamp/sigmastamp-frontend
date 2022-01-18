#!/usr/bin/env node

import chalk from 'chalk';
import { readFile, writeFile } from 'fs/promises';
import { basename, join } from 'path';
import { ROUTES } from '../../src/routes.mjs';

console.info(chalk.bgGrey(`🏭 Postprocessing the build`));

const indexContent = await readFile(
    join(process.cwd(), 'build', 'index.html'),
    'utf8',
);

for (const path of Object.values(ROUTES)) {
    if (path === '/') {
        continue;
    }

    const filePath = join(process.cwd(), 'build', basename(path) + '.html');
    console.log(`Writing ${filePath}`);
    await writeFile(filePath, indexContent);
}

/**
 * TODO: @hejny Make full server-render
 */
