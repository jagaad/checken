#!/usr/bin/env node

import { argv } from 'node:process';
import { glob } from 'glob-gitignore';
import { readFile } from 'node:fs/promises';
import { reporter } from 'vfile-reporter';
import { retext } from 'retext';
import retextSpell from 'retext-spell';
import dictionary from 'dictionary-en-gb';

const processor = retext().use(retextSpell, dictionary);

const [_node, _path, globPattern] = argv;

const matches = await glob(globPattern);

for (const match of matches) {
	const matchContent = await readFile(match);
	const file = await processor.process(matchContent);
	console.error(match, '\n');
	console.error(reporter(file));
}
