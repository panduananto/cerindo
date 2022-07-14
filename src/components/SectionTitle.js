import React from 'react';

function SectionTitle({ title, subTitle, keywordRed }) {
	const textToRed = (text, keyword) => {
		const style = 'color: rgb(220, 38, 38)';
		const selectedText = text.match(new RegExp(keyword, 'i'));
		const convertedText = text.replace(selectedText, `<span style="${style}">${selectedText}</span>`);
		const parsedTextToHTML = new DOMParser().parseFromString(convertedText, 'text/html');

		return { __html: parsedTextToHTML.body.innerHTML };
	};

	return (
		<div className="text-center">
			<h1
				className="font-rubik text-xl font-extrabold text-slate-900 sm:text-2xl md:text-3xl"
				dangerouslySetInnerHTML={textToRed(title, keywordRed)}
			></h1>
			<p className="mt-2 text-sm font-light text-slate-700 sm:text-base md:text-lg">{subTitle}</p>
		</div>
	);
}

export default SectionTitle;
