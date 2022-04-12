/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* eslint-env node */

const { downloadTranslations } = require( '@ckeditor/ckeditor5-dev-env' );
const getToken = require( '@ckeditor/ckeditor5-dev-env/lib/translations/gettoken' );
const { parseArguments, getCKEditor5PackageNames } = require( './utils' );

main().catch( err => {
	console.error( err );

	process.exit( 1 );
} );

/**
 * Download translation messages from the Transifex server.
 *
 * @returns {Promise}
 */
async function main() {
	const options = parseArguments( process.argv.slice( 2 ) );
	const packages = getCKEditor5PackageNames( 'download', options );

	return downloadTranslations( {
		// Token used for authentication with the Transifex service.
		token: await getToken(),

		// Project details.
		organizationName: 'ckeditor',
		projectName: 'ckeditor5',

		// List of packages that will be processed.
		packages: new Map( packages ),

		// An absolute path to the directory that will be used for finding specified `packages`.
		cwd: options.cwd
	} );
}
