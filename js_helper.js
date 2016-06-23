module.exports = {
	page: function(req) {
		var result = { no: 1, skip: 0, limit: 10 };
		
		// no
		result.no = (req.no != null) ? req.no : result.no;
		
		// limit
		result.limit = (req.limit != null) ? req.limit : result.limit;
		
		// skip
		result.skip = (result.no - 1) * result.limit;
		
		return result;
	}
};
