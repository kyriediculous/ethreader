pragma solidity ^0.4.19;
/*
*@notice this function concatenates two strings
*@param _a string 1
*@param _b string 2
*@param _spaces bool add spaces between strings (for eg. concatenating firstName and lastName to fullName)
*@returns concatenated string _a + (space + ) _b
*/
library strings {

  function strConcat(string _a, string _b, bool _spaces) internal pure returns (string) {
    if (_spaces) {
      string memory space = " ";
      bytes memory _bspace = bytes(space);
      bytes memory _ba = bytes(_a);
      bytes memory _bb = bytes(_b);
      string memory ab = new string(_ba.length + _bspace.length +_bb.length);
      bytes memory bab = bytes(ab);
      uint k = 0;
      for (uint i = 0; i < _ba.length; i++) bab[k++] = _ba[i];
      for (i = 0; i < _bspace.length; i++) bab[k++] = _bspace[i];
      for (i = 0; i < _bb.length; i++) bab[k++] = _bb[i];
      return string(bab);
    } else {
      _ba = bytes(_a);
      _bb = bytes(_b);
      ab = new string(_ba.length + _bb.length);
      bab = bytes(ab);
      k = 0;
      for (i = 0; i < _ba.length; i++) bab[k++] = _ba[i];
      for (i = 0; i < _bspace.length; i++) bab[k++] = _bspace[i];
      for (i = 0; i < _bb.length; i++) bab[k++] = _bb[i];
      return string(bab);
    }
  }
}
