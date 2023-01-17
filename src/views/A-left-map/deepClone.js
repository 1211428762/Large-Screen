function isObj(target) {
	if (target instanceof Object) {
		return true;
	}
}

export default function cloneIncludeArrAndFun(target) {
	if (isObj(target) && typeof target !== 'function') {
		// 引用类型 且 不是函数
		const tmpObj = Array.isArray(target) ? [] : {};
		for (const key in target) {
			if (Object.prototype.hasOwnProperty.call(target, key)) {
				tmpObj[key] = cloneIncludeArrAndFun(target[key]);
			}
		}
		return tmpObj;
	}
	// 基本类型则直接返回
	return target;
}