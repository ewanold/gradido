<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: TransactionBody.proto

namespace GPBMetadata;

class TransactionBody
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\Transfer::initOnce();
        \GPBMetadata\StateCreateGroup::initOnce();
        \GPBMetadata\StateGroupChangeParent::initOnce();
        \GPBMetadata\TransactionCreation::initOnce();
        \GPBMetadata\BasicTypes::initOnce();
        $pool->internalAddGeneratedFile(hex2bin(
            "0a84040a155472616e73616374696f6e426f64792e70726f746f12166d6f" .
            "64656c2e6d657373616765732e6772616469646f1a165374617465437265" .
            "61746547726f75702e70726f746f1a1c537461746547726f75704368616e" .
            "6765506172656e742e70726f746f1a195472616e73616374696f6e437265" .
            "6174696f6e2e70726f746f1a10426173696354797065732e70726f746f22" .
            "e7020a0f5472616e73616374696f6e426f6479120c0a046d656d6f180120" .
            "01280912390a076372656174656418022001280b32282e6d6f64656c2e6d" .
            "657373616765732e6772616469646f2e54696d657374616d705365636f6e" .
            "6473123f0a0b63726561746547726f757018062001280b32282e6d6f6465" .
            "6c2e6d657373616765732e6772616469646f2e5374617465437265617465" .
            "47726f75704800124b0a1167726f75704368616e6765506172656e741807" .
            "2001280b322e2e6d6f64656c2e6d657373616765732e6772616469646f2e" .
            "537461746547726f75704368616e6765506172656e74480012340a087472" .
            "616e7366657218082001280b32202e6d6f64656c2e6d657373616765732e" .
            "6772616469646f2e5472616e736665724800123f0a086372656174696f6e" .
            "18092001280b322b2e6d6f64656c2e6d657373616765732e677261646964" .
            "6f2e5472616e73616374696f6e4372656174696f6e480042060a04646174" .
            "61620670726f746f33"
        ), true);

        static::$is_initialized = true;
    }
}
