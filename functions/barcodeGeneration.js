const digitGenerator =(digitMax, digit) =>{
    let currDigit=String(digit)
    for (let index = currDigit.length; index < digitMax; index++) {
        currDigit = '0'+currDigit
        
    }
    return currDigit


}

const generateEanCheckDigit = (barcode) => {
  if (!/^\d{12}$/.test(barcode)) {
    throw new Error("Input must be exactly 12 digits.");
  }

  let sum = 0;

  for (let i = 0; i < 12; i++) {
    const digit = parseInt(barcode[i], 10);
    const weight = i % 2 === 0 ? 1 : 3;
    sum += digit * weight;
  }

  const remainder = sum % 10;
  return String(remainder === 0 ? 0 : 10 - remainder);
};

const EAN13BarcodeGen =(prefix,category_id,item_id)=>{
    const categoryNumber= digitGenerator(4,category_id ? category_id : 0)
    const itemNumber = digitGenerator(5, item_id)
    const noCheckNumber = prefix+categoryNumber+itemNumber
    const checkDigit= generateEanCheckDigit(noCheckNumber)

    return noCheckNumber+checkDigit



    
}
module.exports={EAN13BarcodeGen}