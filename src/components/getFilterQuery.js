const getFilterQuery = (options) => {
	
	console.log('options', options)
	let query = "";
	Object.entries(options).forEach(([key, value]) => {
		let values = [];
		console.log('value', value?.length > 0)

		
		values.push(value);
		query += `&${key}=${values.join(",")}`;
	});
console.log('query', query)
  return query;
};

export default getFilterQuery;
