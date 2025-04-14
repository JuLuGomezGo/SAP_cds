//namespace del archivo
namespace inv;

//entidad de pricehistory
entity priceshistory{

    key ID      :Integer;
    DATE        :DateTime;
    OPEN        :Decimal;
    HIGH        :Decimal;
    LOW         :Decimal;
    CLOSE       :Decimal;
    VOLUME      :Decimal;


};

//entidad de strategies
entity strategies  {
    key ID      :Integer;
    NAME        :String;
    DESCRIPTION :String;
    TIME        :Time;
    RISE        :Double;
   
};